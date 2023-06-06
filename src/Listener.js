const autoBind = require('auto-bind');

class Listener {
  constructor(playlistsService, playlistSongsService, mailSender) {
    this.playlistsService = playlistsService;
    this.playlistSongsService = playlistSongsService;
    this.mailSender = mailSender;
    autoBind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const [playlist, songs] = await Promise.all([
        this.playlistsService.getPlaylistById(playlistId),
        this.playlistSongsService.getPlaylistSongsByPlaylistId(playlistId),
      ]);

      playlist.songs = songs;
      const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify({ playlist }));
      // eslint-disable-next-line no-console
      console.log(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = Listener;

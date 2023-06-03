const autoBind = require('auto-bind');

class Listener {
  constructor(playlistsService, mailSender) {
    this.playlistsService = playlistsService;
    this.mailSender = mailSender;
    autoBind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this.playlistsService.getPlaylists(userId);
      const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(playlists));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
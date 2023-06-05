require('dotenv').config();
const amqp = require('amqplib');
const config = require('./utils/config');
const MailSender = require('./MailSender');
const Listener = require('./Listener');
const PlaylistsService = require('./PlaylistsService');
const PlaylistSongsService = require('./PlaylistSongsService');

const init = async () => {
  const playlistsService = new PlaylistsService();
  const playlistSongsService = new PlaylistSongsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, playlistSongsService, mailSender);

  const connection = await amqp.connect(config.rabbitmq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.listen, { noAck: true });
};

init();

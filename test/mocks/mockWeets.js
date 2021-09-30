const nock = require('nock');
const { randomWeetEndpoint } = require('../../config').common.weetApi;

exports.getWeet = () =>
  nock(randomWeetEndpoint)
    .get()
    .reply(201, {
      _id: '5eb17ab1b69dc744b4e7c8de',
      quoteText: "When I was young I didn't care about education, just money.",
      quoteAuthor: 'Jackie Chan',
      quoteGenre: 'money',
      __v: 0
    });

exports.getLongWeet = () =>
  nock(randomWeetEndpoint)
    .get()
    .reply(200, {
      statusCode: 200,
      message: 'Random quotes',
      pagination: {
        currentPage: 1,
        nextPage: null,
        totalPages: 1
      },
      totalQuotes: 1,
      data: [
        {
          _id: '5eb17aaeb69dc744b4e72ded',
          quoteText:
            "I know a man who doesn't pay to have his trash taken out. How does he get rid of his trash? He gift wraps it, and puts in into an unlocked car.",
          quoteAuthor: 'Henny Youngman',
          quoteGenre: 'car',
          __v: 0
        }
      ]
    });

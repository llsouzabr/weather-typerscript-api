import { Beach, BeachPosition } from '@src/models/beach';
import nock from 'nock';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import apiForecastResponse1BeachFixture from '@test/fixtures/apiForecastResponse1BeachFixture.json'


describe('Beach forecast functional tests', () => {
  beforeEach(async () => {
    await Beach.deleteMany({});
    const defaultBeach = {
      lat: -33.792726,
      lng: 151.289824,
      name: 'Manly',
      position: BeachPosition.E,
    };
    const beach = new Beach(defaultBeach);
    await beach.save();
  });

  it('should return a forecast with just a few times', async () => {
    nock('https://api.stormglass.io:443', {
        encodedQueryParams: true,
        reqheaders: {
          Authorization: (): boolean => true,
        },
      })
      .defaultReplyHeaders({
        'access-control-allow-origin': '*'
      })
      .get('/v2/weather/point')
      .query({
        lat: '-33.792726',
        lng: '151.289824',
        params: /(.*)/,
        source: 'noaa',
        end: /(.*)/,
      })
      .reply(200, stormGlassWeather3HoursFixture);

    const {
      body,
      status
    } = await global.testRequest.get('/forecast');
    expect(status).toBe(200);
    // Make sure we use toEqual to check value not the object and array itself
    expect(body).toEqual(apiForecastResponse1BeachFixture);
  });
});

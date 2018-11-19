import mockingoose from 'mockingoose';
import model from './Profile';

describe('test mongoose User model', () => {
  it('should return the doc with findById', () => {
    const _doc = {
      "_id": "507f191e810c19729de860ea",
      "date": "2018-11-19T09:14:30.294Z",
      "education": [],
      "experience": [],
      "skills": []
    }

    mockingoose.profile.toReturn(_doc, 'findOne'); // findById is findOne

    return model.findById({
      _id: '507f191e810c19729de860ea'
    }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
    });
  });
});
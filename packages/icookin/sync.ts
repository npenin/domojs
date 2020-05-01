import * as akala from '@akala/core'
import * as mongo from 'mongodb'

if (require.main == module)
{
    var client = new mongo.MongoClient('mongodb://ana.dragon-angel.fr:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect().then(async (c) =>
    {
        var db = c.db('kitchen');
        var recipes = db.collection('recipes');
        var lastRecord = await recipes.find({}).sort([['info.creationDate', -1]]).limit(1).next();
        var start = 0;
        var step = 50;
        var totalCount = 0;
        do
        {
            var result = await get(start, step);
            var toInsert = [];
            var toUpdate = [];
            for (var recipe of result.result)
            {
                if (lastRecord && recipe._id === lastRecord._id)
                    break;
                if (lastRecord && recipe.info.creationDate < lastRecord.creationDate)
                    toUpdate.push(recipe);
                else
                    toInsert.push(recipe);
            }

            if (toInsert.length || toUpdate.length)
            {
                totalCount += toInsert.length + toUpdate.length;
                try
                {
                    if (toInsert.length)
                        await recipes.insertMany(toInsert, { bypassDocumentValidation: true, forceServerObjectId: true });
                    if (toUpdate.length)
                        await recipes.updateMany(toInsert, { bypassDocumentValidation: true, forceServerObjectId: true });
                }
                catch (e)
                {
                    console.error(e);
                }
                start += step;
            }
        }
        while (toInsert.length == step)

        console.log(`${totalCount} records inserted`);

        await c.close();
    })
}

var http = akala.resolve<akala.Http>('$http');

export async function get(skip: number, limit: number)
{
    return await http.getJSON<any>(`https://fr-icookin.group-taurus.com/recipes?sortBy=recent&limit=${limit}&skip=${skip}`)
}
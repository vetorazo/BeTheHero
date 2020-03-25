const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        //paginate the incidents
        const { page = 1 } = request.query;
        //count total incidents
        const [count] = await connection('incidents').count();
        //get incidents from database and limit to 5 per page
        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.city',
                'ongs.city',
                'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    //create a new incident in database with a foreign key (ong_id)
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },
    //delete incident  if deletion is requested by the author (check id)
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not Permitted' });
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};
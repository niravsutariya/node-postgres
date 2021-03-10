const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: '123456',
  port: 5432,
})


const getSales = (request, response) => {
    pool.query('SELECT * FROM sales ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getSalesKeyword = (request, response) => {
    let _query;
    if(request.params.keyword == 'daily') {
        console.log("daily");
        _query = `select  extract(hour from date) as hour_of_day ,
            sum(cast (amount as numeric))
            from sales
                WHERE "date" BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()
                group by extract(hour from date) 
                order by hour_of_day desc`;
    } else if(request.params.keyword == 'weekly'){
        console.log("weekly");
        _query = `select  extract(day from date) as day_of_week ,
            sum(cast (amount as numeric))
            from sales
                WHERE date_trunc('week',date) = date_trunc('week',CURRENT_TIMESTAMP)
                group by extract(day from date) 
                order by day_of_week desc`;
    } else if(request.params.keyword == 'monthly'){
        console.log("monthly");
        _query = `select  extract(day from date) as day_of_month ,
            sum(cast (amount as numeric))
            from sales
                WHERE date_trunc('month',date) = date_trunc('month',CURRENT_TIMESTAMP)
                group by extract(day from date) 
                order by day_of_month desc`;
    }
    pool.query(_query, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            code: 200, 
            message: `Sales data for ${request.params.keyword} fetched successfully`, 
            data: results.rows
        })
    })
}

const createSales = (request, response) => {
    const { userName, amount} = request.body
    pool.query('INSERT INTO sales (userName, amount, date) VALUES ($1, $2, current_timestamp)', [userName, amount], (error, results) => {
      if (error) {
        throw error
      }
      if (results)
        response.status(201).json({message: `Sales added successfully.`, code: 200})
    })
}

module.exports = {
    getSales,
    getSalesKeyword,
    createSales,
}
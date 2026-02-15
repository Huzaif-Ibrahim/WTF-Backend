class APIFeature {
    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }

    filter(){
        // 1A. Filtering
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el])   

        // 1B. Advanced Filtering
        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        // From: {duration: {gte: 5}} To {duration: {'$gte': 5}}

        this.query.find(JSON.parse(queryString))
        return this
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.replaceAll(',', ' ')
            this.query = this.query.sort(sortBy)
            // In mongoose, for sort, the query should be - .sort('price maxGroupSize')
            // - for descending order.
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    fieldLimiting(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
            // In mongoose .select('field1 field2 field3') is used to show only those fields and '-' is used to hide them
        } else {
            this.query = this.query.select('-__v')
        }
        return this
    }

    pagination(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 100
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        // .skip(num) will skip the number of documents and .limit(num) will show only the specified number of dicuments.

        return this
    }
}

export default APIFeature
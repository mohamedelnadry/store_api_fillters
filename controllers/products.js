const product = require("../models/product");

const products = async (req, res) => {
  const { name, featured, company,sort,fields,numericFillter } = req.query;
  const obj = {};
  
  if (name) {
    obj.name = { $regex: name, $options: 'i' };
  }
  if (featured) {
    obj.featured = featured === "true" ? true : false;
  }
  if (company) {
    obj.company = company;
  }
  if (numericFillter) {
    const operationMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'$lt',
      '<=':'$lte',
    }
    const regex = /\b(<|<=|=|>=|>)\b/g
    let fillters = numericFillter.replace(regex,(match)=>`-${operationMap[match]}-`)
    const option = ['price','rating']
    fillters = fillters.split(',').forEach((item)=>{
      const [field,operator,value] = item.split('-')
      if (option.includes(field)) {
        obj[field] = {[operator]:Number(value)}
      }
    });    
  }
  let result = product.find(obj);
  if (sort) {
    const sortList = sort.split(',').join(" ")
    result = result.sort(sortList)
    
  }else{
    result = result.sort('createdAt')

  }
  if (fields) {
    const fieldsList = fields.split(',').join(" ")
    result = result.select(fieldsList)
    
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page -1 ) * limit
  result = result.skip(skip).limit(limit)

  const products = await result
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = products;

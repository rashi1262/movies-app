class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludedFeilds = ["limit", "page", "sort", "search"];

    excludedFeilds.forEach((el) => delete queryObj[el]);

    if ("vote_average" in queryObj) {
      queryObj.vote_average = { gte: queryObj.vote_average };
    }
    if ("vote_count" in queryObj) {
      queryObj.vote_count = { gte: queryObj.vote_count };
    }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  search() {
    if (this.queryString.search) {
      const searchTerm = this.queryString.search.trim();
      if (!isNaN(searchTerm)) {
        this.query = this.query.find({
          $or: [
            { vote_average: Number(searchTerm) }, // Exact Match for number
          ],
        });
      } else {
        this.query = this.query.find({
          $or: [
            { title: { $regex: searchTerm, $options: "i" } }, // Case-insensitive
            { overview: { $regex: searchTerm, $options: "i" } },
            { vote_average: { $regex: searchTerm, $options: "i" } },
          ],
        });
      }
    }
    return this;
  }
}

module.exports = APIFeatures;

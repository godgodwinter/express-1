module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      body: String,
      published: Boolean,
    },
    { timestamps: true },
  );
  schema.method('toJSON', function changeId() {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
  });
  const Post = mongoose.model('Post', schema);
  return Post;
};

const uniqueValidator = require('mongoose-unique-validator');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'nama harus diisi'],
        maxlength: [225, 'panjang nama harus antara 3 - 225 karakter'],
        minlength: [3, 'panjang nama harus antara 3 - 225 karakter'],
        unique: true,
      },
      status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'N',
      },
    },
    { timestamps: true },
  );
  schema.plugin(uniqueValidator);

  schema.method('toJSON', function changeId() {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
  });
  const Tapel = mongoose.model('Tapel', schema);
  return Tapel;
};

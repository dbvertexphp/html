```
{
  "email": "vendor@gmail.com",
  "password":"abc123",
  "first_name": "Kunal",
  "last_name": "Mehra",
  "DOB": "2004-03-28",
  "mobile_number": 1234567890,
  "gender": "male",
  "address1": "H.no 70 Prabhat School New Basti ",
  "location": "Ranjhi",
  "country": "India",
  "state": "Madhya Pradesh",
  "city": "Jabalpur",
  "pincode": "482005",
  "subjects": ["Mathematics", "Science"],
  "years_of_experience": 5,
  "qualification": "UG",
  "resume": 12345,
  "working_mode": "offline"
}
```

```
{
  "email":"vendor@gmail.com",
  "password":"abc1234",
  "first_name":"Kunal",
  "last_name":"Mehra",
  "phone_number":123456789
}
```

// TestRouter.get("/hatch", async (req, res) => {
// try {
// let result = await CarModel.find().populate("body_type")
// for (const doc of result) {
// await CarModel.findByIdAndUpdate(doc.\_id, { $set: { cbody_type: doc.body_type.name } });
// }
// let newdata = await CarModel.find()
// res.send(newdata)
// } catch (error) {
// console.log(error)
// res.send(error)
// }
// });

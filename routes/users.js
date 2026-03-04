router.get("/username", async (req, res) => {
    try {
        let us = await req.query.username;
        let pins = [];
        if (us !== "") {
            pins = await Pin.find({ username: us });
        } else {
            pins = await Pin.find()
        }
        res.status(200).json(pins);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await Pin.find().distinct("username");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});
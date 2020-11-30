import dbConnect from '../../../utils/dbConnect'
import List from '../../../models/todo'
dbConnect()

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const lists = await List.find({});

                res.status(200).json({ success: true, data: lists })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const list = await List.create(req.body);

                res.status(201).json({ success: true, data: list })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
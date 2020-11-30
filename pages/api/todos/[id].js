import dbConnect from '../../../utils/dbConnect';
import List from '../../../models/todo'

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const list = await List.findById(id);

                if (!list) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: list });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const list = await List.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!list) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: list });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedNote = await List.deleteOne({ _id: id });

                if (!deletedNote) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}
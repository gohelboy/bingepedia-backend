const watchlistModel = require("../models/watchlist.model");
const { errorResponse, successResponse, failedResponse, successResponseWithData } = require("../utils/response");

exports.add_to_watchlist = async (req, res) => {
    const { data } = req.body;
    if (!data) return failedResponse(res, "invalid values");
    try {
        const record = await watchlistModel.findById(req.userId)
        if (!record) {
            await watchlistModel.create(
                { "_id": req.userId, "data": data }
            )
            return successResponse(res, "added to watchlist")
        }
        await watchlistModel.updateOne({ "_id": req.userId }, { "$push": { data: data } })
        return successResponseWithData(res, "added to watchlist", data)
    } catch (error) {
        return errorResponse(res, error);
    }
}

exports.remove_from_watchlist = async (req, res) => {
    const { id } = req.body;
    if (!id) return failedResponse(res, "Invalid values");
    try {
        const record = await watchlistModel.findById(req.userId)
        if (!record) failedResponse(res, "item already removed from watchlist");
        await watchlistModel.updateOne(
            { "_id": req.userId },
            {
                "$pull":
                {
                    "data": {
                        "id": id
                    }
                }
            });
        return successResponseWithData(res, "removed from watchlist", id)
    } catch (error) {
        return errorResponse(res, error);
    }
}

exports.get_from_watchlist = async (req, res) => {
    const { id } = req.body;
    if (!id) return failedResponse(res, "item not found");
    try {
        const userData = await watchlistModel.findById(id);
        if (!userData) return successResponse(res, "empty watchlist!");
        return successResponseWithData(res, "watched list", userData.data);
    } catch (error) {
        return errorResponse(res, error);
    }
}
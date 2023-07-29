const watchedModel = require("../models/watched.model");
const { errorResponse, successResponse, successResponseWithData } = require("../utils/response");

exports.add_to_watched = async (req, res) => {
    const { data } = req.body;
    if (!data) return failedResponse(res, "invalid values");
    try {
        const record = await watchedModel.findById(req.userId)
        if (!record) {
            await watchedModel.create(
                { "_id": req.userId, "data": data }
            )
            return successResponse(res, "added to watched");
        }
        await watchedModel.updateOne({ "_id": req.userId }, { "$push": { data: data } })
        return successResponse(res, "added to watched")
    } catch (error) {
        return errorResponse(res, error);
    }
}

exports.remove_from_watched = async (req, res) => {
    const { id } = req.body;
    if (!id) return failedResponse(res, "Invalid values");
    try {
        const record = await watchedModel.findById(req.userId)
        if (!record) failedResponse(res, "item already removed from watched");
        await watchedModel.updateOne(
            { "_id": req.userId },
            {
                "$pull":
                {
                    "data": {
                        "id": id
                    }
                }
            });
        return successResponse(res, "removed from watched")
    } catch (error) {
        return errorResponse(res, error);
    }
}

exports.get_from_watched = async (req, res) => {
    try {
        const userData = await watchedModel.findById(req.userId);
        if (!userData) return successResponse(res, "empty watched!")
        return successResponseWithData(res, "watched", userData.data);
    }
    catch (error) {
        return errorResponse(res, error);
    }

}
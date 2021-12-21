exports.getFlash = req => {
    const flashMsgs = {
        success: req.session.flashMsgs.success,
        error: req.session.flashMsgs.error,
    }
    req.session.flashMsgs.success = "";
    req.session.flashMsgs.error = "";
    return flashMsgs;
}

exports.addFlash = (req, type, msg) => {
    if (type == "success") req.session.flashMsgs.success = msg;
    else if (type == "error") req.session.flashMsgs.error = msg;
}
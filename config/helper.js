

module.exports.compileResponse = async (object, tClass) => {
    return {
        [tClass]: object
    };
};


module.exports.compileError = async (functionName, err) => {
    return {
        atFunction: functionName,
        errorMessage: err
    };
};

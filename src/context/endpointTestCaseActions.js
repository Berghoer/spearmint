export const actionTypes = {
    UPDATE_ENDPOINT_STATEMENTS_ORDER: 'UPDATE_ENDPOINT_STATEMENTS_ORDER',
    UPDATE_ENDPOINT_TEST_STATEMENT: 'UPDATE_ENDPOINT_TEST_STATEMENT',

    TOGGLE_ENDPOINT: 'TOGGLE_ENDPOINT',

    CREATE_NEW_ENDPOINT_TEST: 'CREATE_NEW_ENDPOINT_TEST',

    UPDATE_SERVER_FILEPATH: 'UPDATE_SERVER_FILEPATH',

    ADD_ENDPOINT: 'ADD_ENDPOINT',
    DELETE_ENDPOINT: 'DELETE_ENDPOINT',
    UPDATE_ENDPOINT: 'UPDATE_ENDPOINT',
};


export const updateEndpointStatementsOrder = draggableStatements => ({
    type: actionTypes.UPDATE_ENDPOINT_STATEMENTS_ORDER,
    draggableStatements,
});

export const updateEndpointTestStatement = TestStatement => ({
    type: actionTypes.UPDATE_ENDPOINT_TEST_STATEMENT,
    TestStatement
})

export const toggleEndpoint = () => ({
    type: actionTypes.TOGGLE_ENDPOINT,
});

export const createNewEndpointTest = () => ({
    type: actionTypes.CREATE_NEW_ENDPOINT_TEST,
});

export const updateServerFilePath = (serverFileName, serverFilePath) => ({
    type: actionTypes.UPDATE_SERVER_FILEPATH,
    serverFileName,
    serverFilePath,
});
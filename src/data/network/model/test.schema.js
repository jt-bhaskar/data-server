const saveResultSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        mobile: { type: 'string' },
        gender: {
            type: 'string',
            enum: ['MALE', 'FEMALE']
        },
        city: { type: 'string' },
        email: { type: 'string' },
        response: { type: 'object' },
        has_consent: {type: 'boolean'}
    },
    required : ['name','mobile','gender','city','email', 'response', 'has_consent'],
    additionalProperties: false
};

module.exports = {
    saveResultSchema
}
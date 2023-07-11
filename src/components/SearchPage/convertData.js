function convertDataForRequest({
    inn,
    tonality,
    limit,
    startDate,
    endDate,
    maxFullness,
    onlyMainRole,
    inBusinessNews,
    onlyWithRiskFactors,
    excludeTechNews,
    excludeAnnouncements,
    excludeDigests,
}) {
    return {
        issueDateInterval: {
            startDate: `${startDate}T00:00:00.000Z`,
            endDate: `${endDate}T23:59:59.999Z`,
        },
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        type: 'company',
                        sparkId: null,
                        entityId: null,
                        inn,
                        maxFullness,
                        inBusinessNews,
                    },
                ],
                onlyMainRole,
                tonality,
                onlyWithRiskFactors,
                riskFactors: {
                    and: [],
                    or: [],
                    not: [],
                },
                themes: {
                    and: [],
                    or: [],
                    not: [],
                },
            },
            themesFilter: {
                and: [],
                or: [],
                not: [],
            },
        },
        searchArea: {
            includedSources: [],
            excludedSources: [],
            includedSourceGroups: [],
            excludedSourceGroups: [],
        },
        attributeFilters: {
            excludeTechNews: !excludeTechNews,
            excludeAnnouncements: !excludeAnnouncements,
            excludeDigests: !excludeDigests,
        },
        similarMode: 'duplicates',
        limit,
        sortType: 'sourceInfluence',
        sortDirectionType: 'desc',
        intervalType: 'day',
        histogramTypes: ['totalDocuments', 'riskFactors'],
    }
}

export default convertDataForRequest

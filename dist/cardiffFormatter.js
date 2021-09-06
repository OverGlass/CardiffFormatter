function isCardiffFormatterParamTypeSafe1(payload) {
    const predicateType = payload;
    if (!payload && Object.keys(payload).length < 4) return false;
    return predicateType && isInstanceOfBoolean(predicateType.isImport) && isInstanceOfArray(predicateType.notAvailableStandardEquipements) && isInstanceOfArray(predicateType.options) && isInstanceOfArray(predicateType.standardEquipements);
}
function isInstanceOfArray(x) {
    return x instanceof Array;
}
function isInstanceOfBoolean(x) {
    return typeof x === "boolean";
}
function cardiffFormatter1({ options , standardEquipements , notAvailableStandardEquipements , isImport  }) {
    const formatedText = [
        ...formatOptions(options),
        ...formatStandardEquipements(standardEquipements),
        ...formatNotAvailableStandardEquipements(notAvailableStandardEquipements), 
    ].join(" ").slice(0, -2);
    return isImport ? addImport(formatedText) : formatedText;
}
function addImport(s) {
    return `IMPORT - ${s}`;
}
function formatOptions(options) {
    return mapTrimAndReplaceSlashInToPipe((o)=>`*${o} /`
    , options);
}
function formatStandardEquipements(standardEquipements) {
    return mapTrimAndReplaceSlashInToPipe((se)=>`${se} /`
    , standardEquipements);
}
function formatNotAvailableStandardEquipements(standardEquipements) {
    return mapTrimAndReplaceSlashInToPipe((se)=>`SANS ${se} /`
    , standardEquipements);
}
function trimAndReplaceSlashInToPipe(s) {
    return s.trim().replace(/\//g, "|");
}
function mapTrimAndReplaceSlashInToPipe(f, array) {
    return array.filter((el)=>el.length > 1
    ).map((x)=>f(trimAndReplaceSlashInToPipe(x))
    ).sort();
}
export { cardiffFormatter1 as cardiffFormatter, isCardiffFormatterParamTypeSafe1 as isCardiffFormatterParamTypeSafe };

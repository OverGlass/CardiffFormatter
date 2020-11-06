import { isNotUndefinedOrNull } from "https://deno.land/x/fae@v0.6.2/utils/is.ts";

interface cardiffFormatterParam {
  options: Array<string>;
  standardEquipements: Array<string>;
  notAvailableStandardEquipements: Array<string>;
  isImport: boolean;
}

export function isCardiffFormatterParamTypeSafe(payload: any): boolean {
  const predicateType = payload as cardiffFormatterParam;
  if (!payload && Object.keys(payload).length < 4) return false;
  return (
    predicateType &&
    isInstanceOfBoolean(predicateType.isImport) &&
    isInstanceOfArray(predicateType.notAvailableStandardEquipements) &&
    isInstanceOfArray(predicateType.options) &&
    isInstanceOfArray(predicateType.standardEquipements)
  );
}

function isInstanceOfArray(x: any) {
  return x instanceof Array;
}
function isInstanceOfBoolean(x: any) {
  return typeof x === "boolean";
}
function isNotUndefined(x: any) {
  return x !== undefined;
}

export default function cardiffFormatter({
  options,
  standardEquipements,
  notAvailableStandardEquipements,
  isImport,
}: cardiffFormatterParam): string {
  const formatedText = [
    ...formatOptions(options),
    ...formatStandardEquipements(standardEquipements),
    ...formatNotAvailableStandardEquipements(notAvailableStandardEquipements),
  ]
    .join(" ")
    .slice(0, -2);
  return isImport ? addImport(formatedText) : formatedText;
}

export function addImport(s: string): string {
  return `IMPORT - ${s}`;
}

export function formatOptions(options: Array<string>): Array<string> {
  return mapTrimAndReplaceSlashInToPipe((o: string) => `*${o} /`, options);
}

export function formatStandardEquipements(
  standardEquipements: Array<string>
): Array<string> {
  return mapTrimAndReplaceSlashInToPipe(
    (se: string) => `${se} /`,
    standardEquipements
  );
}

export function formatNotAvailableStandardEquipements(
  standardEquipements: Array<string>
): Array<string> {
  return mapTrimAndReplaceSlashInToPipe(
    (se: string) => `SANS ${se} /`,
    standardEquipements
  );
}

export function trimAndReplaceSlashInToPipe(s: string): string {
  return s.trim().replace(/\//g, "|");
}

function mapTrimAndReplaceSlashInToPipe(
  f: Function,
  array: Array<string>
): Array<string> {
  return array
    .filter((el) => el.length > 1)
    .map((x) => f(trimAndReplaceSlashInToPipe(x)))
    .sort();
}

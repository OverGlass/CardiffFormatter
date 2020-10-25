import { assertEquals } from "https://deno.land/std@0.67.0/testing/asserts.ts";
import { assert } from "https://deno.land/std@0.73.0/_util/assert.ts";
import CardiffFormatter, {
  trimAndReplaceSlashInToPipe,
  formatOptions,
  formatNotAvailableStandardEquipements,
  formatStandardEquipements,
  isCardiffFormatterParamTypeSafe,
} from "./cardiffFormatter.ts";

export const Test = function (description: string) {
  return (x: string, fn: () => void) =>
    Deno.test(`${description} | Should ${x}`, fn);
};

const itShould = Test("CardiffFormatter");

const arrayOfStrings = [
  "Lorem Ipsum dolor sit amet, consectetur adipiscing elit  ",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  "  Excepteur sint occaecat cupidatat non proident",
];

itShould("trim and replace every / in to |", () => {
  const sentenceSlashed =
    " Hello I have 1/4 litters of milk for me/him/her I love / and that it  ";
  const sentencePiped =
    "Hello I have 1|4 litters of milk for me|him|her I love | and that it";
  assertEquals(trimAndReplaceSlashInToPipe(sentenceSlashed), sentencePiped);
});

itShould(
  "format OPTIONS array of string whith * at the begnning and / at the end",
  () => {
    const referencial = [
      "*Lorem Ipsum dolor sit amet, consectetur adipiscing elit /",
      "*Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. /",
      "*Excepteur sint occaecat cupidatat non proident /",
    ];
    assertEquals(formatOptions(arrayOfStrings), referencial);
  }
);

itShould(
  "format STANDARD_EQUIPEMENTS array of string whith / at the end",
  () => {
    const referencial = [
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit /",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. /",
      "Excepteur sint occaecat cupidatat non proident /",
    ];
    assertEquals(formatStandardEquipements(arrayOfStrings), referencial);
  }
);

itShould(
  "format NOT_AVAILABLE_STANDARD_EQUIPEMENTS array of string whith SANS at the begnning and / at the end",
  () => {
    const referencial = [
      "SANS Lorem Ipsum dolor sit amet, consectetur adipiscing elit /",
      "SANS Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. /",
      "SANS Excepteur sint occaecat cupidatat non proident /",
    ];
    assertEquals(
      formatNotAvailableStandardEquipements(arrayOfStrings),
      referencial
    );
  }
);

itShould(
  "format options, standardEquipements, notAvailableStandardEquipements in one line and remove last /",
  () => {
    const referencial =
      "*Lorem Ipsum dolor sit amet, consectetur adipiscing elit / *Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. / *Excepteur sint occaecat cupidatat non proident / Lorem Ipsum dolor sit amet, consectetur adipiscing elit / Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. / Excepteur sint occaecat cupidatat non proident / SANS Lorem Ipsum dolor sit amet, consectetur adipiscing elit / SANS Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. / SANS Excepteur sint occaecat cupidatat non proident";

    assertEquals(
      CardiffFormatter({
        options: arrayOfStrings,
        standardEquipements: arrayOfStrings,
        notAvailableStandardEquipements: arrayOfStrings,
        isImport: false,
      }),
      referencial
    );
  }
);

itShould(
  "add IMPORT / at the beggining of the string if isImport is true",
  () => {
    const referencial =
      "IMPORT / *Lorem Ipsum dolor sit amet, consectetur adipiscing elit / *Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. / *Excepteur sint occaecat cupidatat non proident / Lorem Ipsum dolor sit amet, consectetur adipiscing elit / Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. / Excepteur sint occaecat cupidatat non proident / SANS Lorem Ipsum dolor sit amet, consectetur adipiscing elit / SANS Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. / SANS Excepteur sint occaecat cupidatat non proident";

    assertEquals(
      CardiffFormatter({
        options: arrayOfStrings,
        standardEquipements: arrayOfStrings,
        notAvailableStandardEquipements: arrayOfStrings,
        isImport: true,
      }),
      referencial
    );
  }
);

itShould("return false if type of param is not good", () => {
  assert(
    !isCardiffFormatterParamTypeSafe({
      options: [],
      standardEquipements: [],
      notAvailableStandardEquipements: [],
      import: true,
      imposter: "lol",
    }) &&
      !isCardiffFormatterParamTypeSafe({
        options: [],
        standardEquipements: [],
        notAvailableStandardEquipements: [],
        import: "",
      }) &&
      !isCardiffFormatterParamTypeSafe({
        options: "",
        standardEquipements: [],
        notAvailableStandardEquipements: [],
        import: true,
      })
  );
});

itShould("return true if type of param is good", () => {
  assert(
    isCardiffFormatterParamTypeSafe({
      options: [],
      standardEquipements: [],
      notAvailableStandardEquipements: [],
      isImport: true,
    })
  );
});

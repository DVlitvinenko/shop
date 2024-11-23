import { TranslationMap } from "@typesDir/types";

const cutText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + "...";
};

const getWordForNumber = (number: number, wordVariants: string[]) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    const option = [2, 0, 1, 1, 1, 2];
    return wordVariants[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : option[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  return wordVariants[1];
};

function translateToRussian(
  value: string,
  translations: TranslationMap
): string | undefined {
  return translations[value];
}

function translateToEnglish(
  value: string,
  translations: TranslationMap
): string | undefined {
  return Object.keys(translations).find((key) => translations[key] === value);
}

const getDataArray = <T extends object>(obj: T) => {
  return Object.entries(obj).map(([key, value]) => ({
    name: value as string,
    value: key,
  }));
};

const calculateRating = (value: number | undefined) => {
  return value && Math.floor(value * 10) / 10;
};

export {
  cutText,
  getWordForNumber,
  translateToRussian,
  translateToEnglish,
  getDataArray,
  calculateRating,
};

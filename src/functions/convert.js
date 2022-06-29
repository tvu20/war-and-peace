const NUMBERS = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  ELEVEN: 11,
  TWELVE: 12,
  THIRTEEN: 13,
  FOURTEEN: 14,
  FIFTEEN: 15,
  SIXTEEN: 16,
  SEVENTEEN: 17,
  EIGHTEEN: 18,
  NINETEEN: 19,
  TWENTY: 20,
  "FIRST EPILOGUE": 16,
  "SECOND EPILOGUE": 17,
};

export const convertNumber = (str) => {
  for (const num in NUMBERS) {
    if (num === str) return NUMBERS[num];
  }

  return str;
};

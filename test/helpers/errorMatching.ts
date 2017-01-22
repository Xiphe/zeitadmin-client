export default function errorMatching(str: string) {
  return {
    asymmetricMatch(actual: Error): boolean {
      expect(actual).toEqual(jasmine.any(Error));
      expect(actual.message).toEqual(jasmine.stringMatching(str));

      return true;
    },
  };
};

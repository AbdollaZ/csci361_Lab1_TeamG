class Utils {
  trimText(text: string) {
    if (!text.includes(" ")) {
      return text;
    }
    return text.split(" ").filter(Boolean).join(" ");
  }

  numberize(number: string | number) {
    if (typeof number === "string") {
      let result = number;
      if (number.includes(",")) {
        result = result.split(",").join(".");
      }
      return Number(result);
    }
    return number;
  }

  foundBy = (text: string, query: string) => {
    return this.trimText(text)
      .toLowerCase()
      .includes(this.trimText(query).toLowerCase());
  };

  setDate(date: Date) {
    return new Date(date.setHours(12, 0, 0));
  }

  prettyPrice(x: number) {
    return Math.round(x)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  removeKeysFromObject<T>(object: T, keys: (keyof T)[]) {
    const obj = { ...object };
    keys.forEach((key) => {
      delete obj[key];
    });
    return obj;
  }

  getKey<T = Record<string, string>>(obj: T, key: string) {
    // @ts-ignore
    const map = Object.entries(obj).reduce(
      // @ts-ignore
      (o, [key, value]) => ({ ...o, [value]: key }),
      {} as T,
    );
    // @ts-ignore
    return map[key] as keyof T;
  }
}

export default new Utils();

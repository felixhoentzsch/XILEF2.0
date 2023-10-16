const two_blocks = {
    min: 1, // Minimum (inklusive)
    max: 100, // Maximum (inklusive)
    randomInt: function() {
      return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    },
  };
  
  const results = [];
  
  for (let i = 0; i < 100; i++) {
    const randomNum = two_blocks.randomInt();
    const isEven = randomNum % 2 === 0 ? 1 : 0; // Überprüfung, ob die Zahl gerade ist
    results.push(isEven);
  }

  export { results };
class SmartCalculator {
  constructor(initialValue) {
    this.stackNumber = [initialValue];
    this.stackOp = [];
  }

  add(number) {
    if (this.stackOp.length === 0) {
      this.stackOp.push('+');
      this.stackNumber.push(number);
    } else if (['+', '-', '*', '/', '**'].includes(this.stackOp[this.stackOp.length-1])) {
      let poppedNumber_1 = this.stackNumber.pop();
      let poppedNumber_2 = this.stackNumber.pop();
      let poppedOp = this.stackOp.pop();
      this.stackNumber.push(this.calculate(poppedOp, poppedNumber_2, poppedNumber_1));
      this.stackNumber.push(number);
      this.stackOp.push('+');
    } 
    return this;
  }
  
  subtract(number) {
    if (!this.stackOp.length) {
      this.stackOp.push('-');
      this.stackNumber.push(number);
    } else if (['+', '-', '*', '/', '**'].includes(this.stackOp[this.stackOp.length-1])) {
      let poppedNumber_1 = this.stackNumber.pop();
      let poppedNumber_2 = this.stackNumber.pop();
      let poppedOp = this.stackOp.pop();
      this.stackNumber.push(this.calculate(poppedOp, poppedNumber_2, poppedNumber_1));
      this.stackNumber.push(number);
      this.stackOp.push('-');
    } 
    return this; 
  }

  multiply(number) {
    if (!this.stackOp.length || ['+', '-'].includes(this.stackOp[this.stackOp.length-1])) {
      this.stackOp.push('*');
      this.stackNumber.push(number);
    } else if (['*', '/', '**'].includes(this.stackOp[this.stackOp.length-1])) {
      let poppedNumber_1 = this.stackNumber.pop();
      let poppedNumber_2 = this.stackNumber.pop();
      let poppedOp = this.stackOp.pop();
      this.stackNumber.push(this.calculate(poppedOp, poppedNumber_2, poppedNumber_1));
      this.stackNumber.push(number);
      this.stackOp.push('*');
    } 
    return this;
  }

  devide(number) {
    if (!this.stackOp.length || ['+', '-'].includes(this.stackOp[this.stackOp.length-1])) {
      this.stackOp.push('/');
      this.stackNumber.push(number);
    } else if (['*', '/', '**'].includes(this.stackOp[this.stackOp.length-1])) {
      let poppedNumber_1 = this.stackNumber.pop();
      let poppedNumber_2 = this.stackNumber.pop();
      let poppedOp = this.stackOp.pop();
      this.stackNumber.push(this.calculate(poppedOp, poppedNumber_2, poppedNumber_1));
      this.stackNumber.push(number);
      this.stackOp.push('/');
    }
    return this;  
  }

  pow(number) {
    let poppedNumber_1 = number;
    let poppedNumber_2 = this.stackNumber.pop();
    this.stackNumber.push(this.calculate('**', poppedNumber_2, poppedNumber_1));
    return this;
  }
    

  calculate(operator, x, y) {
    switch(operator) {
      case '+':
        return x + y
        break;
      case '-':
        return x - y
        break;
      case '*':
        return x * y
        break;
      case '/':
        return x / y
        break;
      case '**':
        return x ** y
        break;
    }
  }

  valueOf() {
    let result = 0;
    let poppedNumber_1;
    let poppedNumber_2;
    let poppedOp;
    while (this.stackOp.length) {    
      poppedNumber_1 = this.stackNumber.pop();
      poppedNumber_2 = this.stackNumber.pop();
      poppedOp = this.stackOp.pop()
      result = this.calculate(poppedOp, poppedNumber_2, poppedNumber_1)
      this.stackNumber.push(result);
    }
  
  return result
  }
}

module.exports = SmartCalculator;

/* const calculator = new SmartCalculator(10);

    const value = calculator
      .multiply(2)
      .pow(2)
      .subtract(95)
      .subtract(56)
      .pow(2)
      .pow(2)
      .pow(1)
      .multiply(1);
      

console.log(value); */

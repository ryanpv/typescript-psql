export const testFile = () => {
    console.log('testfile saysa hellao');
};
class Hero {
    constructor(name, level) {
        this.name = name,
            this.level = level;
    }
    greet() {
        return `${this.name} says hello.`;
    }
}
const hero1 = new Hero("Hero1", 30);
console.log("hero1: ", hero1);
class Mage extends Hero {
    constructor(name, level, spell) {
        super(name, level);
        this.spell = spell;
    }
    ;
    castSpell() {
        return `casting spell ${this.spell}`;
    }
}
const hero2 = new Mage("Lejon", 90, "Magic Missle");
console.log("Hero2: ", hero2.castSpell());
//# sourceMappingURL=testFile.js.map
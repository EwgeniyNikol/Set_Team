import Character from '../src/js/Character';
import Team from '../src/js/Team';

describe('Team class', () => {
  let team;
  let character1;
  let character2;
  let character3;

  beforeEach(() => {
    team = new Team();
    character1 = new Character('Лучник', 'Bowman');
    character2 = new Character('Мечник', 'Swordsman');
    character3 = new Character('Маг', 'Wizard');
  });

  test('should create empty team', () => {
    expect(team.members).toBeInstanceOf(Set);
    expect(team.members.size).toBe(0);
  });

  test('add method should add character', () => {
    team.add(character1);
    expect(team.members.has(character1)).toBe(true);
    expect(team.members.size).toBe(1);
  });

  test('add method should throw on duplicate', () => {
    team.add(character1);
    expect(() => team.add(character1)).toThrow('Этот персонаж уже добавлен в команду');
  });

  test('addAll method should add multiple characters', () => {
    team.addAll(character1, character2, character3);
    expect(team.members.size).toBe(3);
  });

  test('addAll method should ignore duplicates', () => {
    team.addAll(character1, character1, character2);
    expect(team.members.size).toBe(2);
  });

  test('toArray method should convert Set to array', () => {
    team.addAll(character1, character2);
    const array = team.toArray();
    expect(array).toBeInstanceOf(Array);
    expect(array.length).toBe(2);
    expect(array).toContain(character1);
    expect(array).toContain(character2);
  });
});

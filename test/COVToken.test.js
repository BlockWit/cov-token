const { accounts, contract } = require('@openzeppelin/test-environment');
const { BN } = require('@openzeppelin/test-helpers');
const { assert, expect } = require('chai');
const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const path = require('path');

const Token = contract.fromArtifact('COVToken');
const roles = ['ROLE_ADMIN', 'ROLE_MINTER', 'ROLE_BURNER', 'ROLE_TRANSFER', 'ROLE_ALIEN_TOKEN_SENDER', 'NO_ROLE']
const cases = getCases(roles);

describe('СOVToken specific test', async function () {
  
  const [ admin, minter, burner, transferer, alienTokenSender, other ] = accounts;
  const initialBalance = new BN(1000);
  
  beforeEach(async function () {
    this.token = await Token.new({ from: admin });
  });

  it('has a name', async function () {
    expect(await this.token.name()).to.equal('Covesting');
  });

  describe('COVToken access test', async function () {
    console.log(cases);
    const tests = ['yolo'];
    tests.forEach(function (test) {
      it('yolo', function () {
        assert.equal(false, true);
      });
    });
  })
  
});

function getCases(roles) {
  const input = fs.readFileSync(path.join(__dirname, 'restrictions.csv'), 'utf8');
  const records = parse(input, { from_line: 2 })
  return records.map(r => {
    return {
      func: r[0],
      lock: r[1] ? r[1] : null,
      rules: (() => {
        const result = [];
        for (let i = 0; i < roles.length; i++) {
          const offset = i * 4 + 2
          result.push({ role: roles[i], noLock: r[offset] === '1', accLock: r[offset + 1] === '1', tempLock: r[offset + 2] === '1', finalLock: r[offset + 3] === '1'})
        }
        return result;
      })()
    }
  })
}

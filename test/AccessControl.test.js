const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const Token = contract.fromArtifact('COVToken');

describe('AccessControl', function () {
  const [ admin, authorized, otherAuthorized, other, otherAdmin ] = accounts;

  const ROLE_ADMIN = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const ROLE = web3.utils.soliditySha3('ROLE');
  const OTHER_ROLE = web3.utils.soliditySha3('OTHER_ROLE');

  beforeEach(async function () {
    this.token = await Token.new({ from: admin });
  });

  describe('default admin', function () {
    it('deployer has default admin role', async function () {
      expect(await this.token.hasRole(ROLE_ADMIN, admin)).to.equal(true);
    });

    it('other roles\'s admin is the default admin role', async function () {
      expect(await this.token.getRoleAdmin(ROLE)).to.equal(ROLE_ADMIN);
    });

    it('default admin role\'s admin is itself', async function () {
      expect(await this.token.getRoleAdmin(ROLE_ADMIN)).to.equal(ROLE_ADMIN);
    });
  });

  describe('granting', function () {
    it('admin can grant role to other accounts', async function () {
      const receipt = await this.token.grantRole(ROLE, authorized, { from: admin });
      expectEvent(receipt, 'RoleGranted', { account: authorized, role: ROLE, sender: admin });

      expect(await this.token.hasRole(ROLE, authorized)).to.equal(true);
    });

    it('non-admin cannot grant role to other accounts', async function () {
      await expectRevert(
        this.token.grantRole(ROLE, authorized, { from: other }),
        'AccessControl: sender must be an admin to grant',
      );
    });

    it('accounts can be granted a role multiple times', async function () {
      await this.token.grantRole(ROLE, authorized, { from: admin });
      const receipt = await this.token.grantRole(ROLE, authorized, { from: admin });
      expectEvent.notEmitted(receipt, 'RoleGranted');
    });
  });

  describe('revoking', function () {
    it('roles that are not had can be revoked', async function () {
      expect(await this.token.hasRole(ROLE, authorized)).to.equal(false);

      const receipt = await this.token.revokeRole(ROLE, authorized, { from: admin });
      expectEvent.notEmitted(receipt, 'RoleRevoked');
    });

    context('with granted role', function () {
      beforeEach(async function () {
        await this.token.grantRole(ROLE, authorized, { from: admin });
      });

      it('admin can revoke role', async function () {
        const receipt = await this.token.revokeRole(ROLE, authorized, { from: admin });
        expectEvent(receipt, 'RoleRevoked', { account: authorized, role: ROLE, sender: admin });

        expect(await this.token.hasRole(ROLE, authorized)).to.equal(false);
      });

      it('non-admin cannot revoke role', async function () {
        await expectRevert(
          this.token.revokeRole(ROLE, authorized, { from: other }),
          'AccessControl: sender must be an admin to revoke',
        );
      });

      it('a role can be revoked multiple times', async function () {
        await this.token.revokeRole(ROLE, authorized, { from: admin });

        const receipt = await this.token.revokeRole(ROLE, authorized, { from: admin });
        expectEvent.notEmitted(receipt, 'RoleRevoked');
      });
    });
  });

  describe('renouncing', function () {
    it('roles that are not had can be renounced', async function () {
      const receipt = await this.token.renounceRole(ROLE, authorized, { from: authorized });
      expectEvent.notEmitted(receipt, 'RoleRevoked');
    });

    context('with granted role', function () {
      beforeEach(async function () {
        await this.token.grantRole(ROLE, authorized, { from: admin });
      });

      it('bearer can renounce role', async function () {
        const receipt = await this.token.renounceRole(ROLE, authorized, { from: authorized });
        expectEvent(receipt, 'RoleRevoked', { account: authorized, role: ROLE, sender: authorized });

        expect(await this.token.hasRole(ROLE, authorized)).to.equal(false);
      });

      it('only the sender can renounce their roles', async function () {
        await expectRevert(
          this.token.renounceRole(ROLE, authorized, { from: admin }),
          'AccessControl: can only renounce roles for self',
        );
      });

      it('a role can be renounced multiple times', async function () {
        await this.token.renounceRole(ROLE, authorized, { from: authorized });

        const receipt = await this.token.renounceRole(ROLE, authorized, { from: authorized });
        expectEvent.notEmitted(receipt, 'RoleRevoked');
      });
    });
  });

  describe('enumerating', function () {
    it('role bearers can be enumerated', async function () {
      await this.token.grantRole(ROLE, authorized, { from: admin });
      await this.token.grantRole(ROLE, otherAuthorized, { from: admin });

      const memberCount = await this.token.getRoleMemberCount(ROLE);
      expect(memberCount).to.bignumber.equal('2');

      const bearers = [];
      for (let i = 0; i < memberCount; ++i) {
        bearers.push(await this.token.getRoleMember(ROLE, i));
      }

      expect(bearers).to.have.members([authorized, otherAuthorized]);
    });
  });

  describe('setting role admin', function () {
    beforeEach(async function () {
      const receipt = await this.token.setRoleAdmin(ROLE, OTHER_ROLE);
      expectEvent(receipt, 'RoleAdminChanged', {
        role: ROLE,
        previousAdminRole: ROLE_ADMIN,
        newAdminRole: OTHER_ROLE,
      });

      await this.token.grantRole(OTHER_ROLE, otherAdmin, { from: admin });
    });

    it('a role\'s admin role can be changed', async function () {
      expect(await this.token.getRoleAdmin(ROLE)).to.equal(OTHER_ROLE);
    });

    it('the new admin can grant roles', async function () {
      const receipt = await this.token.grantRole(ROLE, authorized, { from: otherAdmin });
      expectEvent(receipt, 'RoleGranted', { account: authorized, role: ROLE, sender: otherAdmin });
    });

    it('the new admin can revoke roles', async function () {
      await this.token.grantRole(ROLE, authorized, { from: otherAdmin });
      const receipt = await this.token.revokeRole(ROLE, authorized, { from: otherAdmin });
      expectEvent(receipt, 'RoleRevoked', { account: authorized, role: ROLE, sender: otherAdmin });
    });

    it('a role\'s previous admins no longer grant roles', async function () {
      await expectRevert(
        this.token.grantRole(ROLE, authorized, { from: admin }),
        'AccessControl: sender must be an admin to grant',
      );
    });

    it('a role\'s previous admins no longer revoke roles', async function () {
      await expectRevert(
        this.token.revokeRole(ROLE, authorized, { from: admin }),
        'AccessControl: sender must be an admin to revoke',
      );
    });
  });
});

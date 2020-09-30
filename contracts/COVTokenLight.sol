pragma solidity ^0.6.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IOldCOVToken.sol";
import "./IERC20Cutted.sol";
import "./ERC20.sol";
import "./ITransferContarctCallback.sol";

contract COVTokenLight is ERC20, Ownable {

		IOldCOVToken public oldCOVToken = IOldCOVToken(0xE2FB6529EF566a080e6d23dE0bd351311087D567);

    uint256 public constant MAX_INT = uint256(-1);

    uint256 public constant LOCK_BURN = 0;
    uint256 public constant LOCK_TRANSFER = 1;
    uint256 public constant LOCK_MINT = 2;
    uint256 public constant LOCK_ADDR_TIME_LOCK = 3;

		mapping (uint256 => bool) public tempFuncLocks;
		mapping (uint256 => bool) public finalFuncLocks;

		mapping (address => uint256) public locks;

    address public registeredCallback = address(0x0);

    constructor () public ERC20("Covesting", "COV") {
    }

    modifier notFinalFuncLocked(uint256 lock) {
        require(!finalFuncLocks[lock], "Locked");
        _;
    }

    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) public virtual {
        uint256 decreasedAllowance = allowance(account, _msgSender()).sub(amount, "ERC20: burn amount exceeds allowance");

        _approve(account, _msgSender(), decreasedAllowance);
        _burn(account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual override {
        require(!tempFuncLocks[LOCK_BURN] || _msgSender() == owner(), "Token burn locked");
        super._burn(account, amount);				
    }

    function _transfer(address sender, address recipient, uint256 amount) internal virtual override {
        require((!tempFuncLocks[LOCK_TRANSFER] && locks[sender] > now) || _msgSender() == owner(), "Token transfer locked");
        super._transfer(sender, recipient, amount);				

        if (registeredCallback != address(0x0)) {
          ITransferContarctCallback targetCallback = ITransferContarctCallback(registeredCallback);
          targetCallback.tokenFallback(sender, recipient, amount);
        }
		}

    function setTempFuncLock(uint256 lock, bool status) public onlyOwner() {
        tempFuncLocks[lock] = status;
    }

    function finalFuncLock(uint256 lock) public onlyOwner() {
        finalFuncLocks[lock] = true;
    }

    function adminMint(address account, uint256 amount) public onlyOwner() notFinalFuncLocked(LOCK_MINT) {
        _mint(account, amount);
    }

    function adminBurn(address account, uint256 amount) public onlyOwner() notFinalFuncLocked(LOCK_BURN) {
        _burn(account, amount);
    }

    function adminTimelockTransfer(address account, uint256 periodInDays) public onlyOwner() notFinalFuncLocked(LOCK_ADDR_TIME_LOCK) {
        locks[account] = now + periodInDays * 1 days;
    }

    function retrieveTokens(address to, address anotherToken) public onlyOwner() {
        IERC20Cutted alienToken = IERC20Cutted(anotherToken);
        alienToken.transfer(to, alienToken.balanceOf(address(this)));
    }

		function distributeMint(address[] memory receivers, uint[] memory balances) public onlyOwner() notFinalFuncLocked(LOCK_MINT) {
        for(uint i = 0; i < receivers.length; i++) {
           _totalSupply = _totalSupply.add(balances[i]);
           _balances[receivers[i]] = _balances[receivers[i]].add(balances[i]);
           emit Transfer(address(0), receivers[i], balances[i]);
        }
    }

    function distributeLockOldToken(address[] memory receivers) public onlyOwner() {
        for(uint i = 0; i < receivers.length; i++) {
				   oldCOVToken.lock(receivers[i], MAX_INT);
        }
    }

    function registerCallback(address callback) public onlyOwner() {
      registeredCallback = callback;
    }

    function deregisterCallback() public onlyOwner() {
      registeredCallback = address(0x0);
    }

}

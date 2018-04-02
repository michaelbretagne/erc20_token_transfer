pragma solidity ^0.4.21;

contract BreizhCoin {
    address public manager;
    bytes32 public constant name = "BREIZH COIN";
    bytes32 public constant symbol = "BZH";
    uint8  public constant decimals = 2;
    uint256 public totalSupply;
    uint256 public maximumSupply;
    uint256 public freeTokens;
    mapping(address => bool) public freeTokenReceiver;

    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);


    function BreizhCoin(uint256 initSupply, uint256 maxSupply, uint256 freeTokensPerAddress) public {
        // Set manager;
        manager = msg.sender;
        // Set the initial supply
        totalSupply = initSupply;
        // Set maximum supply
        maximumSupply = maxSupply;
        // Set amount of free tokens giveaway per addresses
        freeTokens = freeTokensPerAddress;
        // Set the sender as the owner/manager of all the initial set of tokens
        // Declare the balances mapping
        balances[msg.sender] = totalSupply;
        
    }

    // Manager/Owner requirement    
    modifier restricted() {
        assert(msg.sender == manager);
        _;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        // Return false if specified value is less than the balance available
        if(_value > 0 && balances[msg.sender] < _value) {
            return false;
        }

        // Reduce the balance by _value
        balances[msg.sender] -= _value;

        // Increase the balance of the receiever that is account with address _to
        balances[_to] += _value;

        // Declare & Emit the transfer event
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    // Anyone can call this view function to check the balance of tokens for an address
    function balanceOf(address _someone) public view returns (uint256 balance){
        return balances[_someone];
    }

    // How many tokens can spender spend from owner's account
    function allowance(address _owner, address _spender) public view returns (uint remaining){
        //Return the allowance for _spender approved by _owner
        return allowances[_owner][_spender];
    }

    // Approval - sets the allowance
    function approve(address _spender, uint256 _value) public returns (bool success) {
        if(_value <= 0) return false;

      // Add/change the amount in allowances
        allowances[msg.sender][_spender] = _value;

      // Declare the Approval event and emit it
        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    // Transfer from B. Transfer _value from A's account to C' account
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {   
        // Specified _value must be > 0
        if(_value <= 0) return false;

        // Check if _spender allowed to spend the specified _value from _from account
        // Spender's address = msg.sender
        if(allowances[_from][msg.sender] < _value) return false;

        // Check if the _from has enough tokens
        if(balances[_from] < _value) return false;

        // Reduce the balance _from
        balances[_from] -= _value;
        // Increase the balance _to
        balances[_to] += _value;

        // Reduce the allowance for spender
        allowances[_from][msg.sender] -= _value;

        // Emit a transfer event
        emit Transfer(_from, _to, _value);

        return true;
    }

    // Function that increase the total supply. Can only be called by manager/owner
    function increaseSupply(uint additional) public restricted returns (bool success) {
        require(totalSupply + additional <= maximumSupply);
        // Owner/manager gets the ownership of additional coins
        balances[msg.sender] += additional;
        totalSupply += additional;
        return true;
    }

    // Function that decrease the total supply. Can only be called by manager/owner
    function decreaseSupply(uint reduction) public restricted returns (bool success) {
        // Check if the total supply is higher than the reduction of tokens 
        require(totalSupply >= reduction);
        // Balance of owner/manger deducted
        balances[msg.sender] -= reduction;
        totalSupply -= reduction;
        return true;
    }
    
    function getFreeToken() public {
        // Check if user already got free tokens
        assert(!freeTokenReceiver[msg.sender]);
        // Check if maximum supply bellow the total supply + free tokens
        assert((totalSupply + freeTokens) <= maximumSupply);
        // Increase the balance of 1000 free tokens
        balances[msg.sender] += freeTokens;
        // Add free tokens donated to total suplly
        totalSupply += freeTokens;
        // Add user as free token receicer
        freeTokenReceiver[msg.sender] = true;
    }
    
    function destroyContract() public restricted {
        // Contract suicide
        selfdestruct(manager);
    }

    // Fallback function - Do not accept ethers
    function() public {
        // This will throw an exception - in effect no one can purchase the coin
        assert(true == false);
    }
}
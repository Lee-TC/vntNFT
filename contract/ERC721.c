#include "vntlib.h"

struct token{
    int32 tokenId;
  string name;
  address owner;
  int32 price;
  string hash;
};

KEY address tokenowner;
KEY int32 tokencounter=0;
KEY array(struct token) tokens;
KEY mapping(int32,address) _owners;
KEY array(bool) _isexist;
KEY mapping(address,int32) _balances;
KEY mapping(int32,address) _tokenApprovals;
KEY mapping(address,mapping(address,bool)) _operatorApprovals;

constructor ERC721() {
    tokenowner=GetSender();
    tokens.length=0;
    _isexist.length=0;
}
int32 balanceOf(address owner);
address ownerOf(int32 tokenId);
void Approve(address to,int32 tokenId);
address getApproved(int32 tokenId);
void setApprovalForAll(address operator,bool approved);
bool isApprovedForAll(address owner,address operator);
void transferFrom(address from,address to,int32 tokenId);
bool _exists(int32 tokenId);
void _mint(address to,int32 tokenId);
void _approve(address to,int32 tokenId);
void _transfer(address from,address to,int32 tokenId);
void _setApprovalForAll(address owner,address operator,bool approved);
void _burn(int32 tokenId);
bool _isApprovedOrOwner(address spender,int32 tokenId);

void mint(string name,int32 price,string hash);
void buyToken(int32 tokenId);
void changeTokenPrice(int32 tokenId,int32 newPrice);
int32 totaltoken();

//标准ERC-721代币合约
UNMUTABLE
int32 balanceOf(address owner)
{
    _balances.key=owner;
    return _balances.value;
}

UNMUTABLE
address ownerOf(int32 tokenId)
{
    Require(_exists(tokenId),"nonexistent token");
    _owners.key=tokenId;
    address owner=_owners.value;
    return owner;
}


void Approve(address to,int32 tokenId)
{
    _owners.key=tokenId;
    address owner=_owners.value;
    Require(to!=owner,"approval to current owner");
    Require(GetSender()==owner||isApprovedForAll(owner,GetSender()),"approve caller is not owner nor approved for all");
    _approve(to,tokenId);
}

address getApproved(int32 tokenId)
{
    Require(_exists(tokenId),"nonexistent token");
    _tokenApprovals.key=tokenId;
    return _tokenApprovals.value;
}

void setApprovalForAll(address operator,bool approved)
{
    _setApprovalForAll(GetSender(),operator,approved);
}

bool isApprovedForAll(address owner,address operator)
{
    _operatorApprovals.key=owner;
    _operatorApprovals.value.key=operator;
    return _operatorApprovals.value.value;
}

void transferFrom(address from,address to,int32 tokenId)
{
    // Require(_isApprovedOrOwner(GetSender(),tokenId),"transfer caller is not owner or approved");
    _transfer(from,to,tokenId);
}


bool _exists(int32 tokenId)
{
    if(tokenId>=_isexist.length)
        return false;
    else
    {
        _isexist.index=tokenId;
        return _isexist.value;    
    }
}

void _mint(address to,int32 tokenId)
{
    Require(!Equal(to,Address("0x0000000000000000000000000000000000000000")),"mint to the zero address");
    Require(!_exists(tokenId),"token already minted");

    _isexist.length+=1;
    _isexist.index=_isexist.length-1;
    _isexist.value=true;

    _balances.key=to;
    _balances.value+=1;

    _owners.key=tokenId;
    _owners.value=to;
}


void _approve(address to,int32 tokenId)
{
    _tokenApprovals.key=tokenId;
    _tokenApprovals.value=to;
}

void _transfer(address from,address to,int32 tokenId)
{
    _owners.key=tokenId;
    address owner=_owners.value;
    // Require(owner==from,"transfer from incorrect owner");
    Require(!Equal(to,Address("0x0000000000000000000000000000000000000000")),"transfer to the zero address");
    
    //Clear approvals from the previous owner
    // _approve(Address("0x0000000000000000000000000000000000000000"),tokenId);
    _balances.key=from;
    _balances.value-=1;

    _owners.key=tokenId;
    _owners.value=to;

    _balances.key=to;
    _balances.value+=1;
    
}


void _setApprovalForAll(address owner,address operator,bool approved)
{
    Require(owner!=operator,"approve to caller");
    _operatorApprovals.key=owner;
    _operatorApprovals.value.key=operator;
    _operatorApprovals.value.value=approved;

}

void _burn(int32 tokenId)
{
    _owners.key=tokenId;
    address owner=_owners.value;

    _approve(Address("0x0000000000000000000000000000000000000000"),tokenId);

    _balances.key=owner;
    _balances.value-=1;

    _owners.key=tokenId;
    _owners.value=Address("0x0000000000000000000000000000000000000000");

}

bool _isApprovedOrOwner(address spender,int32 tokenId)
{
    Require(_exists(tokenId),"Nonexistent token");

    _owners.key=tokenId;
    address owner=_owners.value;

    return (spender==owner||getApproved(tokenId)==spender||isApprovedForAll(owner,spender));
}


//合约主体


MUTABLE
void mint(string name,int32 price,string hash)
{
    Require(!Equal(GetSender(),Address("0x0000000000000000000000000000000000000000")),"Address is zero");

    _mint(GetSender(),tokencounter);
    struct token newtoken;
    
    newtoken.name=name;
    newtoken.price=price;
    newtoken.owner=GetSender();
    newtoken.hash=hash;
    newtoken.tokenId=tokencounter;

    tokens.length+=1;
    tokens.index=tokens.length-1;
    tokens.value=newtoken;

    tokencounter+=1;
}

UNMUTABLE
int32 totaltoken()
{
    return tokencounter;
}

UNMUTABLE
string getTokenName(int32 tokenId)
{
    tokens.index=tokenId;
    return tokens.value.name;
}

UNMUTABLE
uint256 getTokenPrice(int32 tokenId)
{
    tokens.index=tokenId;
    return U256FromI64(tokens.value.price);
}

UNMUTABLE
int32 getTokenHash(int32 tokenId)
{
    tokens.index=tokenId;
    return tokens.value.hash;
}

MUTABLE
void $buyToken(int32 tokenId)
{
    Require(!Equal(GetSender(),Address("0x0000000000000000000000000000000000000000")),"Address is zero");
    // Require(_exists(tokenId),"nonexistent token");

    address tokenOriginOwner=ownerOf(tokenId);
    Require(!Equal(tokenOriginOwner,Address("0x0000000000000000000000000000000000000000")),"token's owner should not be an zero address account");
    Require(!Equal(tokenOriginOwner,GetSender()),"the token should not be the token's owner");

    tokens.index=tokenId;
    int32 thisprice=tokens.value.price;
    Require(U256_Cmp(GetValue(),U256FromI64(thisprice))>=0,"You don't have enough money");
    
    transferFrom(tokenOriginOwner,GetSender(),tokenId);
    //必须先向合约转账，使合约有余额，之后再让合约向地址转账
    SendFromContract(GetContractAddress(),GetValue());
    //转账成功之后，必须等到下一次交易，余额才会发生改变！！
    SendFromContract(tokenOriginOwner,GetValue());
    tokens.index=tokenId;
    tokens.value.owner=GetSender();
}

MUTABLE
void changeTokenPrice(int32 tokenId,int32 newPrice)
{
    Require(!Equal(GetSender(),Address("0x0000000000000000000000000000000000000000")),"Address is zero");
    Require(_exists(tokenId),"Nonexistent token");

    _owners.key=tokenId;
    address tokenowner=_owners.value;
    Require(Equal(tokenowner,GetSender()),"It's NOT your token");

    tokens.index=tokenId;
    tokens.value.price=newPrice;

}
//fallback方法，因为有向合约转账的函数，故必须添加fallback函数
$_() {}
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


void keyves7uxyl(){
AddKeyInfo( &tokens.value.price, 1, &tokens, 9, false);
AddKeyInfo( &tokens.value.price, 1, &tokens.index, 4, true);
AddKeyInfo( &tokens.value.price, 1, &tokens.value.price, 9, false);
AddKeyInfo( &tokens.value.name, 6, &tokens, 9, false);
AddKeyInfo( &tokens.value.name, 6, &tokens.index, 4, true);
AddKeyInfo( &tokens.value.name, 6, &tokens.value.name, 9, false);
AddKeyInfo( &tokencounter, 1, &tokencounter, 9, false);
AddKeyInfo( &_balances.value, 1, &_balances, 9, false);
AddKeyInfo( &_balances.value, 1, &_balances.key, 7, false);
AddKeyInfo( &_tokenApprovals.value, 7, &_tokenApprovals, 9, false);
AddKeyInfo( &_tokenApprovals.value, 7, &_tokenApprovals.key, 1, false);
AddKeyInfo( &tokens.value.owner, 7, &tokens, 9, false);
AddKeyInfo( &tokens.value.owner, 7, &tokens.index, 4, true);
AddKeyInfo( &tokens.value.owner, 7, &tokens.value.owner, 9, false);
AddKeyInfo( &tokens.value.hash, 6, &tokens, 9, false);
AddKeyInfo( &tokens.value.hash, 6, &tokens.index, 4, true);
AddKeyInfo( &tokens.value.hash, 6, &tokens.value.hash, 9, false);
AddKeyInfo( &_operatorApprovals.value.value, 8, &_operatorApprovals, 9, false);
AddKeyInfo( &_operatorApprovals.value.value, 8, &_operatorApprovals.key, 7, false);
AddKeyInfo( &_operatorApprovals.value.value, 8, &_operatorApprovals.value.key, 7, false);
AddKeyInfo( &tokenowner, 7, &tokenowner, 9, false);
AddKeyInfo( &_isexist.value, 8, &_isexist, 9, false);
AddKeyInfo( &_isexist.value, 8, &_isexist.index, 4, true);
AddKeyInfo( &tokens.length, 4, &tokens, 9, false);
AddKeyInfo( &_owners.value, 7, &_owners, 9, false);
AddKeyInfo( &_owners.value, 7, &_owners.key, 1, false);
AddKeyInfo( &_isexist.length, 4, &_isexist, 9, false);
AddKeyInfo( &tokens.value.tokenId, 1, &tokens, 9, false);
AddKeyInfo( &tokens.value.tokenId, 1, &tokens.index, 4, true);
AddKeyInfo( &tokens.value.tokenId, 1, &tokens.value.tokenId, 9, false);
}
constructor ERC721() {
keyves7uxyl();
InitializeVariables();
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

                           
UNMUTABLE
int32 balanceOf(address owner)
{
keyves7uxyl();
    _balances.key=owner;
    return _balances.value;
}

UNMUTABLE
address ownerOf(int32 tokenId)
{
keyves7uxyl();
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
                                                            
    Require(!Equal(to,Address("0x0000000000000000000000000000000000000000")),"transfer to the zero address");
    
                                             
                                                                               
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


              


MUTABLE
void mint(string name,int32 price,string hash)
{
keyves7uxyl();
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
keyves7uxyl();
    return tokencounter;
}

UNMUTABLE
string getTokenName(int32 tokenId)
{
keyves7uxyl();
    tokens.index=tokenId;
    return tokens.value.name;
}

UNMUTABLE
uint256 getTokenPrice(int32 tokenId)
{
keyves7uxyl();
    tokens.index=tokenId;
    return U256FromI64(tokens.value.price);
}

UNMUTABLE
string getTokenhash(int32 tokenId)
{
keyves7uxyl();
    tokens.index=tokenId;
    return tokens.value.hash;
}

MUTABLE
void $buyToken(int32 tokenId)
{
keyves7uxyl();
    Require(!Equal(GetSender(),Address("0x0000000000000000000000000000000000000000")),"Address is zero");
                                                     

    address tokenOriginOwner=ownerOf(tokenId);
    Require(!Equal(tokenOriginOwner,Address("0x0000000000000000000000000000000000000000")),"token's owner should not be an zero address account");
    Require(!Equal(tokenOriginOwner,GetSender()),"the token should not be the token's owner");

    tokens.index=tokenId;
    int32 thisprice=tokens.value.price;
    Require(U256_Cmp(GetValue(),U256FromI64(thisprice))>=0,"You don't have enough money");
    
    transferFrom(tokenOriginOwner,GetSender(),tokenId);
                                                                                       
    SendFromContract(GetContractAddress(),GetValue());
                                                                                       
    SendFromContract(tokenOriginOwner,GetValue());
    tokens.index=tokenId;
    tokens.value.owner=GetSender();
}

MUTABLE
void changeTokenPrice(int32 tokenId,int32 newPrice)
{
keyves7uxyl();
    Require(!Equal(GetSender(),Address("0x0000000000000000000000000000000000000000")),"Address is zero");
    Require(_exists(tokenId),"Nonexistent token");

    _owners.key=tokenId;
    address tokenowner=_owners.value;
    Require(Equal(tokenowner,GetSender()),"It's NOT your token");
                                                                                 
    tokens.index=tokenId;
    tokens.value.price=newPrice;

}
                                                                                    
$_() {
keyves7uxyl();}
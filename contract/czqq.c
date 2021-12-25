#include "vntlib.h"
#include "Add.h"

KEY int32 var1,var2;
constructor TestContract(){

}


int32 Add(int32 a,int32 b)
{
    int32 result;
    result = a + b;
    return result;
}

MUTABLE
void SetVar1(int32 _value)
{
    var1=_value;
}

MUTABLE
void SetVar2(int32 _value)
{
    var2=_value;
}

UNMUTABLE
int32 test()
{
    int32 result=Add(var1,var2);
    return result;
}
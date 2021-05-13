export function Assert(aCondition: boolean, aError?: string): asserts aCondition
{
    if (!aCondition) throw new Error(aError);
}

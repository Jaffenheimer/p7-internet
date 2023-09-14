using System;
using System.Data;
using Dapper;

namespace P7_Internet_Persistence.Dapper;

public class GuidTypeHandler : SqlMapper.TypeHandler<Guid>
{
    public override void SetValue(IDbDataParameter parameter, Guid guid)
    {
        parameter.Value = guid.ToString();
    }

    public override Guid Parse(object value)
    {
        // Dapper may pass a Guid instead of a string
        if (value is Guid) return (Guid) value;
        if (Guid.TryParse((string) value, out Guid guid)) return guid;

        return Guid.Empty;
    }
}
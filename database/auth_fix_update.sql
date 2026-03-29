USE GlowvitraDb;
GO

/*
  Auth fix patch
  - Adds IsActive flag for account status checks.
  - Normalizes email casing.
  - Replaces legacy plain-text passwords with ASP.NET Identity-compatible PBKDF2 hashes.
  - Adds supporting index for login lookups.
*/

IF COL_LENGTH('dbo.Users', 'IsActive') IS NULL
BEGIN
    ALTER TABLE dbo.Users
    ADD IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT (1);
END;
GO

UPDATE dbo.Users
SET Email = LOWER(LTRIM(RTRIM(Email)));
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID('dbo.Users')
      AND name = 'IX_Users_Email_IsActive'
)
BEGIN
    CREATE NONCLUSTERED INDEX IX_Users_Email_IsActive
        ON dbo.Users (Email, IsActive);
END;
GO

/*
  Deterministic ASP.NET Identity password hashes for test users:
  Admin  -> Admin@123
  Client -> User@123
*/
MERGE dbo.Users AS tgt
USING (
    SELECT
        'Admin' AS Name,
        'admin@glowvitra.com' AS Email,
        'AQAAAAEAACcQAAAAEAARIjNEVWZ3iJmqu8zd7v/f6R+0Uv4II41W/vZi+BI0CqhRndcGaAYLSRtRQFeTMg==' AS PasswordHash,
        'Admin' AS Role,
        CAST(1 AS BIT) AS IsActive
    UNION ALL
    SELECT
        'User',
        'user@glowvitra.com',
        'AQAAAAEAACcQAAAAEP/u3cy7qpmId2ZVRDMiEQAqTEHho7pGTiOzTiFH/XQMF91aURouAI0kAE2C5gsChg==',
        'Customer',
        CAST(1 AS BIT)
) AS src
ON tgt.Email = src.Email
WHEN MATCHED THEN
    UPDATE SET
        tgt.Name = src.Name,
        tgt.PasswordHash = src.PasswordHash,
        tgt.Role = src.Role,
        tgt.IsActive = src.IsActive
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Name, Email, PasswordHash, Role, IsActive)
    VALUES (src.Name, src.Email, src.PasswordHash, src.Role, src.IsActive);
GO

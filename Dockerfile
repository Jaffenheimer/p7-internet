﻿FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /P7-Internet

#Copy Files
COPY ["P7Internet.Persistence/", "P7Internet.Persistence/"]
COPY ["P7Internet.RestApi/", "P7Internet.RestApi/"]

# Persistence project
WORKDIR /P7-Internet/P7Internet.Persistence
RUN dotnet restore
RUN dotnet build 

# Shared project

# Api project
WORKDIR /P7-Internet/P7Internet.RestApi
RUN dotnet restore
RUN dotnet publish -c Release -o out


# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /src
COPY --from=build-env /P7-Internet/P7Internet.RestApi/out .
ENTRYPOINT ["dotnet", "P7Internet.RestApi.dll"]

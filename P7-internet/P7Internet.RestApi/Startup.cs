using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using P7_internet.Services;
using P7Internet.Persistence.Extensions;

namespace P7Internet
{
    namespace Translation.RestApi
    {
        public class Startup
        {
            private const string ServiceName = "P7.RestApi";
            private const string SwaggerRoute = "recipes";

            public Startup(IConfiguration configuration)
            {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }

            // This method gets called by the runtime. Use this method to add services to the container.
            public void ConfigureServices(IServiceCollection services)
            {
                var mvcBuilder = services.AddControllers();
                mvcBuilder.AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo {Title = ServiceName, Version = "v1"});
                });

                services.ConfigurePersistenceMySqlConnection(Configuration.GetConnectionString("MySqlDatabase"));

                services.AddSingleton(new OpenAiService(Configuration.GetSection("OpenAI").GetValue<string>("APIKey")));
            }

            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }

                app.UseSwagger(c => { c.RouteTemplate = $"/{SwaggerRoute}" + "/{documentName}/swagger.json"; });
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint($"/{SwaggerRoute}/v1/swagger.json", "v1");
                    c.RoutePrefix = $"{SwaggerRoute}/swagger";
                });

                app.UseRouting();
                app.UseCors();
                app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            }
        }
    }
}
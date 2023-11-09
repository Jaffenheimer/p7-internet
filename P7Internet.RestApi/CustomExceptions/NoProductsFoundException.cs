using System;

namespace P7Internet.CustomExceptions
{
    public class NoProductsFoundException : Exception
    {
        public NoProductsFoundException()
        {
        }

        public NoProductsFoundException(string message)
            : base(message)
        {
        }

        public NoProductsFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}

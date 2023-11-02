using System;

namespace P7Internet.CustomExceptions
{
    public class ZipNotFoundException : Exception
    {
        public ZipNotFoundException()
        {
        }

        public ZipNotFoundException(string message)
            : base(message)
        {
        }

        public ZipNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
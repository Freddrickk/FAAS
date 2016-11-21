#include <stdio.h>
#include <string.h>

int main(int argc, char **argv) {
	char buffer[10];

	if (argc == 2) {
		strcpy(buffer, argv[1]);
	} else {
		gets(buffer);
	}

	return 0;
}

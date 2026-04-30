export const algorithmsData = [

  {
    name: "Count the Number of 1's in a Number",
    code: `; Count the Number of 1's in a Number
LDA 8500H
MVI B, 08
MVI D, 00
Loop1: RLC
JNC Loop2
INR D
Loop2: DCR B
JNZ Loop1
MOV A, D
STA 8600H
RST 5`
  },

  {
    name: "Arrange Numbers in Ascending Order",
    code: `; Arrange Numbers in Ascending Order
LXI H, 8500H
MOV C, M
DCR C
Repeat: MOV D, C
LXI H, 8501H
Loop: MOV A, M
INX H
CMP M
JC Skip
MOV B, M
MOV M, A
DCX H
MOV M, B
INX H
Skip: DCR D
JNZ Loop
DCR C
JNZ Repeat
RST 5`
  },

  {
    name: "Sum of Series of Even Numbers",
    code: `; Sum of Series of Even Numbers
LDA 8500H
MOV C, A
MVI B, 00
LXI H, 8501H
Back: MOV A, M
ANI 01
JNZ Skip
MOV A, B
ADD M
MOV B, A
Skip: INX H
DCR C
JNZ Back
STA 8600H
RST 5`
  },

  {
    name: "Count Bytes Equal to AD (10101101)",
    code: `; Count Bytes Equal to AD (10101101)
MVI B, 0A
MVI D, AD
MVI C, 00
LXI H, 8500H
Back: MOV A, M
CMP D
JNZ Next
INR C
Next: INX H
DCR B
JNZ Back
MOV A, C
STA 8600H
RST 5`
  },

  {
    name: "Count Numbers with Even Parity",
    code: `; Count Numbers with Even Parity
MVI B, 0A
MVI C, 00
LXI H, 8500H
Back: MOV A, M
ANI FF
JPO Next
INR C
Next: INX H
DCR B
JNZ Back
MOV A, C
STA 8600H
RST 5`
  },

  {
    name: "Convert BCD to Binary",
    code: `; Convert BCD to Binary
LDA 8500H
MOV B, A
ANI 0F
MOV C, A
MOV A, B
ANI F0
RRC
RRC
RRC
RRC
MOV B, A
XRA A
MVI D, 0A
Sum: ADD D
DCR B
JNZ Sum
ADD C
STA 8600H
RST 5`
  },

  {
    name: "Exchange Contents of Memory Locations",
    code: `; Exchange Contents of Memory Locations
LDA 8500H
MOV B, A
LDA 8600H
STA 8500H
MOV A, B
STA 8600H
RST 5`
  },

  {
    name: "Find the Largest Number in an Array of 10 Elements",
    code: `; Find the Largest Number in an Array of 10 Elements
MVI B, 09
LXI H, 8500H
MOV A, M
INX H
Back: CMP M
JNC Next
MOV A, M
Next: INX H
DCR B
JNZ Back
STA 850AH
RST 5`
  }

];

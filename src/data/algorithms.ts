export const algorithmsData = [

  {
    id: 1,
    name: "Steepest Descent Method",
    code: `clc
clear all

f = @(x1,x2) (x1.^2 + 2*x2.^2);
grad_f = @(x1,x2) [2*x1; 4*x2];
x = [3;3];
max_itr = 100;
tol = 1e-6;
alpha = 0.1;

fprintf('\\n Initial point : (%f,%f)', x(1), x(2))

for i = 1:max_itr
    gradient = grad_f(x(1), x(2));
    if norm(gradient) < tol
        fprintf('\\n Converged after %d iterations', i-1)
        break;
    end
    x = x - alpha * gradient;
    fprintf('\\n Iteration %d : x=(%f,%f), f(x)=%f', i, x(1), x(2), f(x(1), x(2)))
end

fprintf('\\n Final solution : (%f,%f)', x(1), x(2))
fprintf('\\n Minimum function value: %f\\n', f(x(1), x(2)))`
  },

  {
    id: 2,
    name: "Simplex Method",
    code: `clc
clear

C = [1 2 3 0 0];
A = [1 2 0 1 0;
     3 0 4 0 1];
b = [20; 30];

[m, n] = size(A);
bv_index = n-m+1:n;
Y = [A b];

for iter = 1:50
    Cb = C(bv_index);
    Xb = Y(:,end);
    Z = Cb'*Xb;
    ZjCj = Cb'*Y(:,1:n) - C;
    Table = [ZjCj; Z; Y];

    if all(ZjCj >= 0)
        disp('Optimal solution found:')
        disp(Xb)
        disp(Z)
        break
    else
        [~, EV] = min(ZjCj);
        if all(Y(:,EV) <= 0)
            disp('Unbounded solution')
            break
        else
            ratio = inf(m,1);
            for j = 1:m
                if Y(j,EV) > 0
                    ratio(j) = Xb(j) / Y(j,EV);
                end
            end
            [~, LV] = min(ratio);
            bv_index(LV) = EV;
            pivot = Y(LV,EV);
            Y(LV,:) = Y(LV,:) / pivot;
            for i = 1:m
                if i ~= LV
                    Y(i,:) = Y(i,:) - Y(i,EV)*Y(LV,:);
                end
            end
        end
    end
end`
  },

  {
    id: 3,
    name: "Least Cost Method (LCM)",
    code: `clc
clear all
format short

Cost = [11 20 7 8; 21 16 10 12; 8 12 18 9];
A = [50 40 70];
B = [30 25 35 40];

if sum(A) == sum(B)
    fprintf('Given Transportation Problem is Balanced \\n')
else
    fprintf('Given Transportation Problem is Unbalanced \\n')
    if sum(A) < sum(B)
        Cost(end+1,:) = zeros(1,size(B,2));
        A(end+1) = sum(B) - sum(A);
    elseif sum(B) < sum(A)
        Cost(:,end+1) = zeros(1,size(A,2));
        B(end+1) = sum(A) - sum(B);
    end
end

ICost = Cost;
X = zeros(size(Cost));
[m,n] = size(Cost);
BFS = m + n - 1;

for i = 1:size(Cost,1)
    for j = 1:size(Cost,2)
        hh = min(Cost(:));
        [Row_index, Col_index] = find(hh == Cost);
        x11 = min(A(Row_index), B(Col_index));
        [~, index] = max(x11);
        ii = Row_index(index);
        jj = Col_index(index);
        y11 = min(A(ii), B(jj));
        X(ii,jj) = y11;
        A(ii) = A(ii) - y11;
        B(jj) = B(jj) - y11;
        Cost(ii,jj) = Inf;
    end
end

fprintf('Initial BFS =\\n')
IBFS = array2table(X);
disp(IBFS);

TotalBFS = length(nonzeros(X));
if TotalBFS == BFS
    fprintf('Initial BFS is Non-Degenerate \\n')
else
    fprintf('Initial BFS is Degenerate \\n')
end

InitialCost = sum(sum(ICost .* X));
fprintf('Initial BFS Cost is = %d \\n', InitialCost);`
  },

  {
    id: 4,
    name: "Updated Steepest",
    code: `format short
clear all
clc

% Numeric-only Updated Steepest Descent (no Symbolic Toolbox)
fobj = @(x1,x2) x1-x2+2*x1.^2+2*x1.*x2+x2.^2;
grad = @(x) [4*x(1)+2*x(2)+1; 2*x(1)+2*x(2)-1];
H = [4 2; 2 2]; % Hessian matrix

x0 = [1;1];
maxiter = 4;
tol = 1e-3;
X = [];

for iter = 1:maxiter
    g = grad(x0);
    if norm(g) < tol
        break
    end
    lambda = (g'*g) / (g'*H*g);
    x0 = x0 - lambda * g;
    X = [X x0];
end

fprintf('Optimal Solution X=[%f, %f]\\n', x0(1), x0(2))
fprintf('Optimal Value f(x) = %f\\n', fobj(x0(1), x0(2)))`
  }

];

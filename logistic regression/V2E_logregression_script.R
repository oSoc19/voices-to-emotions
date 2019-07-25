############################
##  LOGISTIC REGRESSION   ##
##  created for Engie     ##
##  in context of oSoc19  ##
############################ (team Voices to Emotions)

## Set environment
rm(list=ls())
setwd = "" #include windows path to folder with dataset, change / into \

## Load dataset
df = read.csv("filename.smth", header = T) #load csv, indicate header = F if the first
                                           #line does not contain the variable names
names(df) #check the names of the variables

## If the dataset has the averages, skip this step
Ehappy = c()
for (i in 1:nrow(df)) {
  Ehappy = cbind(Ehappy, mean(df[5:14,i]))
} #replace 5:14 with the columns that contain the happiness percentage
df = cbind(df, Ehappy)
# repeat for all emotions

## If the dataset has the difference in call duration, skip this step
duration_diff = c()
for (i in 1:nrow(df)) {
  duration_diff = cbind(duration_diff, max(df[15:24,i])-min(df[15:24,i]))
} #replace 15:24 with the columns that contain the call duration
df = cbind(df, duration_diff)

## Logistic regression
mod <- glm(left ~ age + sex + job + duration_diff + Ehappy + Eangry + Esad + Efear, 
           family = binomial)
summary(mod)
coef(mod) # these coefficients can replace the dummy coef in the calculation

## Remarks
# Be careful with removing variables, just because they are not significant. They might
# be significant when the dataset is larger OR the effect may not be linear. This can 
# be inspected using the partial residuals. It might also be interesting to check out
# outliers for employees. If any additional help is needed with any of this, do not
# hesitate to contact me at lauravanheck@hotmail.com.








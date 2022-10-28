from getGoods import list2info
import json
import random
from operator import itemgetter
CXPB, MUTPB, NGEN, popsize = 0.9, 0.9, 100, 1000

with open("durListNew.json", encoding="utf-8") as f:
    dur = json.load(f)
with open("route.json", encoding="utf-8") as f:
    route = json.load(f)

def getTransFee(num, mode):
    fee = 0
    if mode == "sea":
        fee = 30
        fee += (num/5) * 20
    else:
        fee = 50
        fee += (num/2) * 30
    return fee
# create a gene 
class Gene:
  def __init__(self, **data):
    self.__dict__.update(data)
    self.size = len(data['data'])  # length of gene

# define GA algorithm
class GA:
  def __init__(self, parameter): # initialize the parameters
    # parameter = [CXPB, MUTPB, NGEN, popsize, low, up]
    self.parameter = parameter
    low = self.parameter[4]
    up = self.parameter[5]
    self.bound = []
    self.bound.append(low)
    self.bound.append(up)

    pop = []
    for i in range(self.parameter[3]):
      geneinfo = []
      for pos in range(len(low)):
        geneinfo.append(random.randint(self.bound[0][pos], self.bound[1][pos]))  # initialise popluation

      fitness = self.evaluate(geneinfo)  # evaluate each chromosome
      pop.append({'Gene': Gene(data=geneinfo), 'fitness': fitness})  # store the chromosome and its fitness

    self.pop = pop
    self.bestindividual = self.selectBest(self.pop) 

  def evaluate(self, geneinfo): # fitness
    goodList = self.parameter[6]
    des = route[geneinfo[len(geneinfo) - 1]][0].split("-")[0]
    mode = route[geneinfo[len(geneinfo) - 1]][0].split("-")[1]
    x_time = 0
    x_cost = 0
    for i in range(0, len(geneinfo) - 1):
       x_cost += float(goodList[i][geneinfo[i]][0])
       item = 3
       if dur.get(goodList[i][geneinfo[i]][2]) != None:
           item = int(dur[goodList[i][geneinfo[i]][2]][des])
       x_time = max(x_time, item)
    x_cost += getTransFee(len(geneinfo) - 1, mode)
    x_time += route[geneinfo[len(geneinfo) - 1]][1]
    y = (x_time/10)**2 + (x_cost/100)**2
    return y

  def getCostAndTime(self, geneinfo):
      goodList = self.parameter[6]
      des = route[geneinfo[len(geneinfo) - 1]][0].split("-")[0]
      mode = route[geneinfo[len(geneinfo) - 1]][0].split("-")[1]
      x_time = 0
      x_cost = 0
      for i in range(0, len(geneinfo) - 1):
         x_cost += float(goodList[i][geneinfo[i]][0])
         item = 3
         if dur.get(goodList[i][geneinfo[i]][2]) != None:
             item = int(dur[goodList[i][geneinfo[i]][2]][des])
         x_time = max(x_time, item)
      x_cost += getTransFee(len(geneinfo) - 1, mode)
      x_time += route[geneinfo[len(geneinfo) - 1]][1]
      return [x_cost, x_time]
  
  def selectBest(self, pop):  # the best individual in this populization
    s_inds = sorted(pop, key=itemgetter("fitness"), reverse=False)          # from large to small, return a pop
    return s_inds[0]

  def selection(self, individuals, k):  # generate the offspring according to probability
    s_inds = sorted(individuals, key=itemgetter("fitness"),
                  reverse=True)  # sort the pop by the reference of fitness
    sum_fits = sum(ind['fitness'] for ind in individuals)  # sum up the fitness of the whole pop

    chosen = []
    for i in range(k):
      u = random.random() * sum_fits  # randomly produce a num in the range of [0, sum_fits], as threshold
      sum_ = 0
      for ind in s_inds:
        sum_ += ind['fitness']  # sum up the fitness
        if sum_ >= u:
          chosen.append(ind)
          break
    chosen = sorted(chosen, key=itemgetter("fitness"), reverse=False)
    return chosen
 
  def crossoperate(self, offspring):  # crossover
    dim = len(offspring[0]['Gene'].data)

    geninfo1 = offspring[0]['Gene'].data  # Gene's data of first offspring chosen from the selected pop
    geninfo2 = offspring[1]['Gene'].data  # Gene's data of second offspring chosen from the selected pop

    if dim == 1:
      pos1 = 1
      pos2 = 1
    else:
      pos1 = random.randrange(1, dim)  # select a position in the range from 0 to dim-1,
      pos2 = random.randrange(1, dim)

    newoff1 = Gene(data=[])  # offspring1 produced by cross operation
    newoff2 = Gene(data=[])  # offspring2 produced by cross operation
    temp1 = []
    temp2 = []
    for i in range(dim):
      if min(pos1, pos2) <= i < max(pos1, pos2):
          temp2.append(geninfo2[i])
          
          temp1.append(geninfo1[i])
      else:
          temp2.append(geninfo1[i])
          temp1.append(geninfo2[i])
    newoff1.data = temp1
    newoff2.data = temp2

    return newoff1, newoff2
 
  def mutation(self, crossoff, bound):  # mutation
    dim = len(crossoff.data)

    if dim == 1:
      pos = 0
    else:
      pos = random.randrange(0, dim)  # chose a position in crossoff to perform mutation.

    crossoff.data[pos] = random.randint(bound[0][pos], bound[1][pos])
    return crossoff
 
  def GA_main(self):  # Loop
    popsize = self.parameter[3]
    # Begin the evolution
    for g in range(NGEN):
      # Apply selection based on their converted fitness
      selectpop = self.selection(self.pop, popsize)
      nextoff = []
      while len(nextoff) != popsize:
          # Apply crossover and mutation on the offspring
          # Select two individuals
        offspring = [selectpop.pop() for _ in range(2)]
        if random.random() < CXPB:  # cross two individuals with probability CXPB
          crossoff1, crossoff2 = self.crossoperate(offspring)
          if random.random() < MUTPB:  # mutate an individual with probability MUTPB
            muteoff1 = self.mutation(crossoff1, self.bound)
            muteoff2 = self.mutation(crossoff2, self.bound)
            fit_muteoff1 = self.evaluate(muteoff1.data)  # Evaluate the individuals
            fit_muteoff2 = self.evaluate(muteoff2.data)  # Evaluate the individuals
            nextoff.append({'Gene': muteoff1, 'fitness': fit_muteoff1})
            nextoff.append({'Gene': muteoff2, 'fitness': fit_muteoff2})
          else:
            fit_crossoff1 = self.evaluate(crossoff1.data)  # Evaluate the individuals
            fit_crossoff2 = self.evaluate(crossoff2.data)
            nextoff.append({'Gene': crossoff1, 'fitness': fit_crossoff1})
            nextoff.append({'Gene': crossoff2, 'fitness': fit_crossoff2})
        else:
          nextoff.extend(offspring)

      # The population is entirely replaced by the offspring
      self.pop = nextoff

      best_ind = self.selectBest(self.pop)

      if best_ind['fitness'] < self.bestindividual['fitness']:
        self.bestindividual = best_ind

def recommend(keywords):
    try: 
      goodList = list2info(keywords)
      up = []  # upper range for variables
      low = []  # lower range for variables
      for i in goodList:
          up.append(len(i)-1)
          low.append(0)
      up.append(len(route)-1)
      low.append(0)
      parameter = [CXPB, MUTPB, NGEN, popsize, low, up, goodList]
      run = GA(parameter)
      run.GA_main()
      res = run.bestindividual['Gene'].data
      goods = []
      for i in range(0, len(goodList)):
          goods.append(goodList[i][res[i]])
      item = run.getCostAndTime(res)
      result = {
          "goods": goods,
          "cost": int(item[0]),
          "time": item[1],
          "center": route[res[len(res)-1]][0].split("-")[0]
      }
    except: 
      result = {'error': "system.error"}
    return json.dumps(result)
